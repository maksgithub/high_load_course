CONTAINER=percona

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/db.sql
docker exec -it $CONTAINER mysqladmin -u root --password=my-secret-pw flush-logs
docker exec -it $CONTAINER ls -lh /var/lib/mysql/