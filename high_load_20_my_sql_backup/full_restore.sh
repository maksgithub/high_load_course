CONTAINER=4a36a0f1decac7ef1c958ae41bc652969356586a25e49d2adbd032aa3ba642a3

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/prepare_db.sql

time cat ./full_backup/backup0.sql | docker exec -i $CONTAINER /usr/bin/mysql -u root --password=my-secret-pw users_db
docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/count.sql

time cat ./full_backup/backup1.sql | docker exec -i $CONTAINER /usr/bin/mysql -u root --password=my-secret-pw users_db
docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/count.sql

time cat ./full_backup/backup2.sql | docker exec -i $CONTAINER /usr/bin/mysql -u root --password=my-secret-pw users_db
docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ./sql/count.sql