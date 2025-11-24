terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.49"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

# ---- 1. используем существующий SSH KEY ----------------------
data "hcloud_ssh_key" "default" {
  name = var.existing_ssh_key_name
}

# ---- 2. создаём сервер ---------------------------------------
resource "hcloud_server" "web" {
  name        = var.server_name
  image       = "ubuntu-22.04"
  server_type = var.server_type
  location    = var.hcloud_location

  ssh_keys = [data.hcloud_ssh_key.default.id]

  public_net {
    ipv4_enabled = true
    ipv6_enabled = false
  }
}

