FROM python:latest

WORKDIR /app

EXPOSE 5050

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

COPY . ./

CMD ["python3","main.py"]