CONTAINER=percona

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/prepare.sql

rm -rf ./full_backup
mkdir ./full_backup

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/db.sql
time docker exec $CONTAINER /usr/bin/mysqldump -u root --password=my-secret-pw users_db > ./full_backup/backup0.sql

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/db.sql
time docker exec $CONTAINER /usr/bin/mysqldump -u root --password=my-secret-pw users_db > ./full_backup/backup1.sql

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/db.sql
time docker exec $CONTAINER /usr/bin/mysqldump -u root --password=my-secret-pw users_db > ./full_backup/backup2.sql

ls -lh full_backup