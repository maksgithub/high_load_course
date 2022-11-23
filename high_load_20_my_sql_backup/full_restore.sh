CONTAINER=percona

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/prepare_db.sql

time cat ./full_backup/backup0.sql | docker exec -i $CONTAINER /usr/bin/mysql -u root --password=my-secret-pw users_db
docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/count.sql

time cat ./full_backup/backup1.sql | docker exec -i $CONTAINER /usr/bin/mysql -u root --password=my-secret-pw users_db
docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/count.sql

time cat ./full_backup/backup2.sql | docker exec -i $CONTAINER /usr/bin/mysql -u root --password=my-secret-pw users_db
docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/count.sql