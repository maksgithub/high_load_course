CONTAINER=percona

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/prepare_db.sql
time docker exec -i $CONTAINER mysqlbinlog /var/lib/mysql/mysql-bin.000001 /var/lib/mysql/mysql-bin.000002 /var/lib/mysql/mysql-bin.000003 /var/lib/mysql/mysql-bin.000004 /var/lib/mysql/mysql-bin.000005 | docker exec -i $CONTAINER mysql -u root -pmy-secret-pw
# cat ./backup_data/backup_full.sql | docker exec -i $CONTAINER /usr/bin/mysql -u root --password=my-secret-pw users_db
# docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/count.sql

# docker exec -i $CONTAINER –uroot mysqlbinlog /var/lib/mysql/mysql-bin.000005_ > /logs/allbinlog.sql

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/count.sql