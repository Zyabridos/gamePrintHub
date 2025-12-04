ANSIBLE_DIR=ansible
VAULT_PASS_FILE=vault-password

# ----------- Terraform -----------

init:
	@echo "Initializing Terraform..."
	cd terraform && terraform init

apply:
	@echo "Applying Terraform changes..."
	cd terraform && terraform apply -auto-approve

destroy:
	@echo "Destroying Terraform infrastructure..."
	cd terraform && terraform destroy -auto-approve

output:
	@echo "Showing Terraform outputs..."
	cd terraform && terraform output

# ----------- Ansible -----------

ping:
	@echo "Pinging web servers..."
	cd $(ANSIBLE_DIR) && ansible -i inventory.ini webservers -m ping --vault-password-file $(VAULT_PASS_FILE)

ansible-dry-run:
	@echo "Running playbook in CHECK (dry-run) mode..."
	cd $(ANSIBLE_DIR) && ansible-playbook -i inventory.ini playbook.yml --check --diff --vault-password-file $(VAULT_PASS_FILE)

playbook:
	@echo "Running Ansible entire Playbook..."
	cd $(ANSIBLE_DIR) && ansible-playbook -i inventory.ini playbook.yml --vault-password-file $(VAULT_PASS_FILE)

deploy:
	@echo "Running Ansible deployment..."
	cd $(ANSIBLE_DIR) && ansible-playbook -i inventory.ini playbook.yml --vault-password-file $(VAULT_PASS_FILE) --tags deploy

ssh:
	@echo "SSH into production server..."
	ssh root@37.27.199.67


# ----------- Help -----------

help:
	@echo ""
	@echo "\033[1;36m==============================================\033[0m"
	@echo "      \033[1;32mGame Print Hub — Infra Commands\033[0m"
	@echo "\033[1;36m==============================================\033[0m"
	@echo ""
	@echo " \033[1;33mTerraform:\033[0m"
	@echo "   \033[1;32minit\033[0m             - Initialize Terraform"
	@echo "   \033[1;32mapply\033[0m            - Apply Terraform changes"
	@echo "   \033[1;32mdestroy\033[0m          - Destroy infrastructure"
	@echo "   \033[1;32moutput\033[0m           - Show outputs"
	@echo ""
	@echo " \033[1;33mAnsible:\033[0m"
	@echo "   \033[1;32mping\033[0m             - Ping webservers"
	@echo "   \033[1;32mansible-dry-run\033[0m  - Run playbook in CHECK mode"
	@echo "   \033[1;32mplaybook\033[0m         - Run full playbook"
	@echo "   \033[1;32mdeploy\033[0m           - Run deploy tasks (--tags deploy)"
	@echo "   \033[1;32mssh\033[0m              - SSH into production server"
	@echo ""
	@echo "\033[1;35mUsage:\033[0m"
	@echo "  make <command>"
	@echo ""