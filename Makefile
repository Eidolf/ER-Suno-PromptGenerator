.PHONY: install dev test

install-backend:
	cd backend && pip install -r requirements.txt

install-frontend:
	cd frontend && npm install

dev-backend:
	cd backend && uvicorn app.main:app --reload

dev-frontend:
	cd frontend && npm run dev

test-backend:
	cd backend && pytest tests/

test-frontend:
	cd frontend && npm test

docker-build:
	docker build -t suno-prompt-gen .

docker-run:
	docker run -p 13050:13050 suno-prompt-gen
