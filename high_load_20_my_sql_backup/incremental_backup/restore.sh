CONTAINER=mysql_db

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/prepare_db.sql

cat ./backup_data/backup_full.sql | docker exec -i $CONTAINER /usr/bin/mysql -u root --password=my-secret-pw users_db
docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/count.sql