output "game_print_hub_prod_ipv4" {
  description = "Public IPv4 address of game-print-hub-prod"
  value       = hcloud_server.game_print_hub_prod.ipv4_address
}
