# Correcao do Erro 503 no Passenger/cPanel

## Causa provavel

O erro 503 observado no ambiente online e compativel com falha de inicializacao do Passenger causada por excesso de threads na carga do NumPy/OpenBLAS.

Evidencia informada:

```text
OpenBLAS blas_thread_init: pthread_create failed
Resource temporarily unavailable
```

No projeto, o `app.py` importava `pandas` no carregamento global da aplicacao. Isso podia carregar `numpy/OpenBLAS` durante o boot do Passenger, antes de qualquer rota ser acessada.

## Correcao aplicada localmente

- `app.py`
  - Define variaveis de limite de threads antes de qualquer import pesado.
  - Remove o import global de `pandas`.
  - Carrega `pandas` somente nas funcoes que geram planilhas.

- `passenger_wsgi.py`
  - Criado na raiz do projeto.
  - Define os mesmos limites de threads antes de importar `app`.
  - Expoe `application` para o Passenger.

- `.cpanel.yml`
  - Garante criacao de `public` e `tmp`.
  - Ajusta permissoes para `755`.
  - Remove `.git` do destino publicado.
  - Reinicia o Passenger com `tmp/restart.txt`.

- `public/.htaccess`
  - Versionado com a configuracao do Passenger para o dominio do PTA.

- `.gitignore`
  - Removida a regra que ignorava `public/.htaccess`.

## Variaveis limitadas

Todas devem ficar com valor `1`:

```text
OPENBLAS_NUM_THREADS
OMP_NUM_THREADS
OMP_THREAD_LIMIT
MKL_NUM_THREADS
NUMEXPR_NUM_THREADS
NUMEXPR_MAX_THREADS
VECLIB_MAXIMUM_THREADS
BLIS_NUM_THREADS
```

## Testes locais executados

- Compilacao Python:

```text
py -3.11 -m py_compile app.py passenger_wsgi.py
Resultado: OK
```

- Importacao via Passenger:

```text
from passenger_wsgi import application
Resultado: OK
```

- Conferencia das variaveis:

```text
OPENBLAS_NUM_THREADS=1
OMP_NUM_THREADS=1
OMP_THREAD_LIMIT=1
MKL_NUM_THREADS=1
NUMEXPR_NUM_THREADS=1
NUMEXPR_MAX_THREADS=1
VECLIB_MAXIMUM_THREADS=1
BLIS_NUM_THREADS=1
```

- Conferencia de import leve:

```text
pandas_carregado_no_import=False
numpy_carregado_no_import=False
```

- Rotas de Excel testadas por Flask test client:

```text
/baixar_excel -> 200
/baixar_excel_municipios -> 200
/baixar_excel_etapas -> 200
```

## Limitacao do teste local

O teste de 20 inicializacoes em processos independentes nao foi concluido neste ambiente local porque o launcher Python/venv aponta para um executavel da Windows Store inexistente em subprocessos:

```text
Unable to create process using ... PythonSoftwareFoundation.Python.3.11 ...
```

Esse teste deve ser repetido no cPanel com o Python real do ambiente:

```bash
cd ~/pta2025
for i in $(seq 1 20); do
  ~/virtualenv/pta2025/3.11/bin/python -c "from passenger_wsgi import application; print('OK')"
done
```

## Validacao no cPanel apos deploy

```bash
cd ~/pta2025
stat -c '%A | %a | %U:%G | %n' ~/pta2025 ~/pta2025/public ~/pta2025/tmp
touch tmp/restart.txt
sleep 8
curl -k -sS -H 'Cache-Control: no-cache' -o /dev/null -w 'HTTP %{http_code} | tempo %{time_total}s\n' "https://pta2025.projetoswebcsg.life/?nocache=$(date +%s)"
```

Esperado: `HTTP 200` ou redirecionamento controlado `HTTP 302`.

Verificar logs:

```bash
grep -E "pthread_create failed|Resource temporarily unavailable|OpenBLAS|Traceback" ~/pta2025/tmp/passenger.log 2>/dev/null
```

Esperado: nenhuma nova ocorrencia relacionada ao OpenBLAS.

## Rollback

Se a correcao gerar regressao apos commit/deploy:

```bash
git revert <SHA_DO_COMMIT_DA_CORRECAO>
git push origin main
```

No cPanel:

```bash
cd ~/pta2025
touch tmp/restart.txt
```
