output "server_ip" {
  description = "Public IPv4 address of the app server"
  value       = hcloud_server.web.ipv4_address
}
