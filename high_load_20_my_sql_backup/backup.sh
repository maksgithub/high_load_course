CONTAINER=4a75cd9ccd62ce23dc4736f171bc239fba634e0f8f73ba4ac9e4328822ef409a

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < db.sql

docker exec $CONTAINER /usr/bin/mysqldump -u root --password=my-secret-pw users_db > ./backups/backup.sql

# Restore
# cat backup.sql | docker exec -i CONTAINER /usr/bin/mysql -u root --password=root DATABASE