init: 
	docker compose up -d
	cd ./risk-management-service && npm install
	ls
	cd ./ocr-service && npm install

start-app-1:
	cd ./risk-management-service && npm start 

start-app-2:
	cd ./ocr-service && npm start 

trigger:
	cd ./demo && npm start
