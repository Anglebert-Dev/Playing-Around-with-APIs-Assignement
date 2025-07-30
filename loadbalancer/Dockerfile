FROM haproxy:latest

# Copy configuration
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg

# Expose the port
EXPOSE 8080

# Use a custom entrypoint to ensure DNS works
ENTRYPOINT ["haproxy", "-f", "/usr/local/etc/haproxy/haproxy.cfg"]