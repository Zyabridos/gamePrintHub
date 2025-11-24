variable "hcloud_token" {
  description = "Hetzner Cloud API token"
  type        = string
  sensitive   = true
}

variable "server_type" {
  description = "Hetzner server type"
  type        = string
  default     = "cx22"
}

variable "hcloud_location" {
  description = "Hetzner location"
  type        = string
  default     = "hel1"
}

variable "server_name" {
  description = "Server name"
  type        = string
  default     = "frostops-prod"
}

variable "existing_ssh_key_name" {
  description = "Name of existing SSH key in Hetzner Cloud"
  type        = string
  default     = "frostops-key"
}
