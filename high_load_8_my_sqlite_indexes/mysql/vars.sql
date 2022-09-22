show variables like "connect_timeout";
show variables like "net_read_timeout";
show variables like "innodb_flush_log_at_trx_commit";
show variables like "innodb_adaptive_hash_index";


SET GLOBAL wait_timeout=300;
SET GLOBAL innodb_flush_log_at_trx_commit=0;
SET GLOBAL innodb_adaptive_hash_index=OFF;
