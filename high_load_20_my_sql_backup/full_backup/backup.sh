CONTAINER=percona

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/prepare.sql

rm -rf ./full_backup_data
mkdir ./full_backup_data

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/db.sql
time docker exec $CONTAINER /usr/bin/mysqldump -u root --password=my-secret-pw users_db > ./full_backup_data/backup0.sql

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/db.sql
time docker exec $CONTAINER /usr/bin/mysqldump -u root --password=my-secret-pw users_db > ./full_backup_data/backup1.sql

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/db.sql
time docker exec $CONTAINER /usr/bin/mysqldump -u root --password=my-secret-pw users_db > ./full_backup_data/backup2.sql

ls -lh full_backup_data