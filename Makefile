.PHONY: install run test backend frontend clean

install:
	@echo "Installing Backend Dependencies..."
	cd backend && pip install -r requirements.txt
	@echo "Installing Frontend Dependencies..."
	cd frontend && npm install

backend:
	cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000

frontend:
	cd frontend && npm run dev

run:
	@echo "Starting AgriKavach Backend & Frontend concurrently..."
	npx concurrently \
		-n "BACKEND,FRONTEND" \
		-c "blue,green" \
		"cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000" \
		"cd frontend && npm run dev"

test:
	cd backend && pytest -v tests/test_api.py

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
	rm -rf frontend/dist frontend/node_modules
