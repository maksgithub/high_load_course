CONTAINER=percona

docker exec -i $CONTAINER mysql -u root --password=my-secret-pw < ../sql/count.sql