# =========================================
#   Game Print Hub — Docker Commands
# =========================================

BACKEND = gameprinthub-backend-1
FRONTEND = gameprinthub-frontend-1
POSTGRES = gameprinthub-postgres-1

# ----------- Docker-----------

build:
	@echo "Building Docker images..."
	docker compose build

up:
	@echo "Starting all services..."
	docker compose up

up-d:
	@echo "Starting all services in background..."
	docker compose up -d

down:
	@echo "Stopping and removing all containers..."
	docker compose down

restart:
	@echo "Restarting Docker services..."
	docker compose down
	docker compose up -d

rebuild:
	@echo "Rebuilding Docker services..."
	docker compose down
	docker compose build
	docker compose up

clean:
	@echo "\033[1;31mWARNING: This will remove ALL Docker data: containers, images, volumes, cache.\033[0m"
	@echo "\033[1;33mFull cleanup (\033[1;31mdanger!\033[1;33m)\033[0m"
	@echo -n "Type 'y' or 'yes' to continue: " && read ans && \
	([ "$$ans" = "y" ] || [ "$$ans" = "yes" ]) || \
	( echo "Cancelled."; exit 1 )
	@echo "Cleaning Docker system..."
	docker system prune -a --volumes -f

# ----------- Docker Shell -----------

sh-backend:
	@echo "Opening shell in backend..."
	docker compose exec backend sh

sh-frontend:
	@echo "Opening shell in frontend..."
	docker compose exec frontend sh

sh-db:
	@echo "Opening shell in Postgres..."
	docker compose exec postgres bash	

# ----------- Logs -----------

logs-backend:
	@echo "Showing backend logs..."
	docker compose logs -f $(BACKEND)

logs-frontend:
	@echo "Showing frontend logs..."
	docker compose logs -f $(FRONTEND)

logs-db:
	@echo "Showing Postgres logs..."
	docker compose logs -f $(POSTGRES)

# ----------- Tests inside container -----------

test-backend:
	@echo "Running backend tests inside container..."
	docker compose exec $(BACKEND) npm test


# ----------- DB / Migrations / Seeds -----------

migrate:
	@echo "Running migrations inside backend container..."
	docker compose exec $(BACKEND) npm run migrate

migrate-rollback:
	@echo "Rolling back last migration..."
	docker compose exec $(BACKEND) npm run migrate:rollback

seed:
	@echo "Running DB seeds..."
	docker compose exec $(BACKEND) npm run seed

help:
	@echo ""
	@echo "\033[1;36m==============================================\033[0m"
	@echo "      \033[1;32mGame Print Hub — Docker Commands\033[0m"
	@echo "\033[1;36m==============================================\033[0m"
	@echo ""
	@echo " \033[1;33mMain Commands:\033[0m"
	@echo "   \033[1;32mbuild\033[0m           - Build Docker images"
	@echo "   \033[1;32mup\033[0m              - Start all services (foreground)"
	@echo "   \033[1;32mup-d\033[0m            - Start all services in background"
	@echo "   \033[1;32mdown\033[0m            - Stop and remove all containers"
	@echo "   \033[1;32mrebuild\033[0m         - Stop, rebuild and restart all services"
	@echo "   \033[1;32mrestart\033[0m         - Restart all services"
	@echo "   \033[1;32mlogs\033[0m            - View combined logs"
	@echo ""
	@echo " \033[1;33mLogs:\033[0m"
	@echo "   \033[1;32mlogs-backend\033[0m    - Backend logs"
	@echo "   \033[1;32mlogs-frontend\033[0m   - Frontend logs"
	@echo "   \033[1;32mlogs-db\033[0m         - Postgres logs"
	@echo ""
	@echo " \033[1;33mShell inside containers:\033[0m"
	@echo "   \033[1;32msh-backend\033[0m      - Shell into backend container"
	@echo "   \033[1;32msh-frontend\033[0m     - Shell into frontend container"
	@echo "   \033[1;32msh-db\033[0m           - Shell into Postgres container"
	@echo ""
	@echo " \033[1;33mTests:\033[0m"
	@echo "   \033[1;32mtest-backend\033[0m    - Run backend tests inside container"
	@echo ""
	@echo " \033[1;33mDatabase (Migrations/Seeds):\033[0m"
	@echo "   \033[1;32mmigrate\033[0m           - Run DB migrations"
	@echo "   \033[1;32mmigrate-rollback\033[0m  - Roll back last migration"
	@echo "   \033[1;32mseed\033[0m              - Run DB seeds"
	@echo ""
	@echo " \033[1;33mCleanup:\033[0m"
	@echo "   \033[1;32mprune\033[0m           - Remove Docker unused resources"
	@echo "   \033[1;32mclean\033[0m           - Full cleanup (\033[1;31mdanger!\033[0m)"
	@echo ""
	@echo "\033[1;35mUsage:\033[0m"
	@echo "  make <command>"
	@echo ""
