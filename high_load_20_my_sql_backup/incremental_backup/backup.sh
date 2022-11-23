CONTAINER=mysql_db

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/prepare.sql

rm -rf ./backup_data
mkdir ./backup_data

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/db.sql
docker exec $CONTAINER /usr/bin/mysqldump -u root --password=my-secret-pw users_db > ./backup_data/backup_full.sql
docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/db.sql
docker exec -it $CONTAINER mysqladmin -u root --password=my-secret-pw flush-logs
docker exec -it $CONTAINER ls -lh /var/lib/mysql/