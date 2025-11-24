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

ping-web:
	@echo "Pinging web servers..."
	cd ansible && ansible -i inventory.ini webservers -m ping

install-roles:
	@echo "Installing Ansible Galaxy roles..."
	cd ansible && ansible-galaxy install -r requirements.yml

deploy:
	@echo "Running Ansible deployment..."
	ansible-playbook -i ansible/inventory.ini -v ansible/playbook.yml --tags deploy
 
playbook:
	@echo "Running Ansible entire Playbook..."
	@cd ansible && ansible-playbook playbook.yml --ask-vault-password

ssh:
	ssh root@37.27.199.67

help:
	@echo ""
	@echo "\033[1;36m========================\033[0m"
	@echo " \033[1;32mGame Print Hub — Commands\033[0m"
	@echo "\033[1;36m========================\033[0m"
	@echo ""
	@echo " \033[1;33mTerraform:\033[0m"
	@echo "   \033[1;32minit\033[0m        - Initialize Terraform"
	@echo "   \033[1;32mapply\033[0m       - Apply Terraform changes (auto-approve)"
	@echo "   \033[1;32mdestroy\033[0m     - Destroy infrastructure"
	@echo "   \033[1;32moutput\033[0m      - Show outputs"
	@echo ""
	@echo " \033[1;33mAnsible:\033[0m"
	@echo "   \033[1;32mping-web\033[0m    - Ping webservers"
	@echo "   \033[1;32minstall-roles\033[0m - Install roles"
	@echo "   \033[1;32mdeploy\033[0m       - Run deployment (vault)"
	@echo "   \033[1;32mplaybook\033[0m     - Run full playbook"
	@echo "   \033[1;32mssh\033[0m          - SSH into production server"
	@echo ""
	@echo "\033[1;35mUsage:\033[0m make <command>"
	@echo ""
