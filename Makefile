DEV_COMPOSE = -f docker-compose.development.yml

# ----------- Development Commands (Docker) -----------

dev-build:
	@echo "Building DEV Docker images..."
	docker compose $(DEV_COMPOSE) build

dev-up:
	@echo "Starting DEV services (foreground)..."
	docker compose $(DEV_COMPOSE) up

dev-up-d:
	@echo "Starting DEV services in background..."
	docker compose $(DEV_COMPOSE) up -d

dev-down:
	@echo "Stopping DEV containers..."
	docker compose $(DEV_COMPOSE) down

dev-restart:
	@echo "Restarting DEV services..."
	docker compose $(DEV_COMPOSE) down
	docker compose $(DEV_COMPOSE) up -d

dev-logs:
	@echo "Showing logs for all DEV services..."
	docker compose $(DEV_COMPOSE) logs -f

dev-sh-backend:
	@echo "Opening shell in DEV backend..."
	docker compose $(DEV_COMPOSE) exec $(BACKEND) sh

dev-sh-frontend:
	@echo "Opening shell in DEV frontend..."
	docker compose $(DEV_COMPOSE) exec $(FRONTEND) sh

dev-sh-db:
	@echo "Opening shell in DEV Postgres..."
	docker compose $(DEV_COMPOSE) exec $(POSTGRES) bash

dev-migrate:
	@echo "Running DEV migrations..."
	docker compose $(DEV_COMPOSE) exec $(BACKEND) npm run migrate

dev-migrate-rollback:
	@echo "Rolling back DEV migration..."
	docker compose $(DEV_COMPOSE) exec $(BACKEND) npm run migrate:rollback

dev-seed:
	@echo "Running DEV seeds..."
	docker compose $(DEV_COMPOSE) exec $(BACKEND) npm run seed


# -----------------------------------------
#   Docker Production Commands
# -----------------------------------------

BACKEND = backend
FRONTEND = frontend
POSTGRES = postgres

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

# -----------------------------------------
#   Docker Shell
# -----------------------------------------

sh-backend:
	@echo "Opening shell in backend..."
	docker compose exec $(BACKEND) sh

sh-frontend:
	@echo "Opening shell in frontend..."
	docker compose exec $(FRONTEND) sh
	
sh-db:
	@echo "Opening shell in Postgres..."
	docker compose exec $(POSTGRES) bash	

# -----------------------------------------
#   Docker Logs
# -----------------------------------------

logs-backend:
	@echo "Showing backend logs..."
	docker compose logs -f $(BACKEND)

logs-frontend:
	@echo "Showing frontend logs..."
	docker compose logs -f $(FRONTEND)

logs-db:
	@echo "Showing Postgres logs..."
	docker compose logs -f $(POSTGRES)

# -----------------------------------------
#   Tests inside containter
# -----------------------------------------

test-backend:
	@echo "Running backend tests inside container..."
	docker compose exec $(BACKEND) npm test


# -----------------------------------------
# 	DB / Migrations / Seeds
# -----------------------------------------

migrate:
	@echo "Running migrations inside backend container..."
	docker compose exec $(BACKEND) npm run migrate

migrate-rollback:
	@echo "Rolling back last migration..."
	docker compose exec $(BACKEND) npm run migrate:rollback

seed:
	@echo "Running DB seeds..."
	docker compose exec $(BACKEND) npm run seed

# -----------------------------------------
# 	Help
# -----------------------------------------

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
	@echo ""
	@echo " \033[1;33mDevelopment (via docker):\033[0m"
	@echo "   \033[1;32mdev-build\033[0m              - Build DEV images"
	@echo "   \033[1;32mdev-up\033[0m                 - Start DEV services (foreground)"
	@echo "   \033[1;32mdev-up-d\033[0m               - Start DEV services in background"
	@echo "   \033[1;32mdev-down\033[0m               - Stop DEV containers"
	@echo "   \033[1;32mdev-restart\033[0m            - Restart DEV services"
	@echo "   \033[1;32mdev-logs\033[0m               - Show DEV logs"
	@echo "   \033[1;32mdev-sh-backend\033[0m         - Shell into DEV backend"
	@echo "   \033[1;32mdev-sh-frontend\033[0m        - Shell into DEV frontend"
	@echo "   \033[1;32mdev-sh-db\033[0m              - Shell into DEV Postgres"
	@echo "   \033[1;32mdev-migrate\033[0m            - Run DEV migrations"
	@echo "   \033[1;32mdev-migrate-rollback\033[0m   - Roll back last DEV migration"
	@echo "   \033[1;32mdev-seed\033[0m               - Run DEV seeds"
	@echo""
	@echo "\033[1;35mUsage:\033[0m"
	@echo "  make <command>"
	@echo ""
