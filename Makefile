test-backend:
	cd backend && npm test -s

prepare:
	cd backend && cp -n .env.example .env || true