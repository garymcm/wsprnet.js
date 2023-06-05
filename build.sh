#!/bin/bash

git pull

build_wsprnet_ingress() {
	docker build . -t wsprnet/ingress -f Dockerfile_Ingress
	kubectl delete -f build/k8s/90-wsprnet-ingress-depl.yaml
	kubectl apply -f build/k8s/90-wsprnet-ingress-depl.yaml

}

build_grid6_consumer() {
	docker build . -t wsprnet/consumers -f Dockerfile
	kubectl delete -f build/k8s/70-grid6-consumer-depl.yaml
	kubectl apply -f build/k8s/70-grid6-consumer-depl.yaml
}

build_spot_consumer() {
	docker build . -t wsprnet/consumers -f Dockerfile
	kubectl delete -f build/k8s/70-spot-consumer-depl.yaml
	kubectl apply -f build/k8s/70-spot-consumer-depl.yaml
}

build_status_consumer() {
	docker build . -t wsprnet/consumers -f Dockerfile
	kubectl delete -f build/k8s/70-status-consumer-depl.yaml
	kubectl apply -f build/k8s/70-status-consumer-depl.yaml
}

build_upload_consumer() {
	docker build . -t wsprnet/consumers -f Dockerfile
	kubectl delete -f build/k8s/70-upload-consumer-depl.yaml
	kubectl apply -f build/k8s/70-upload-consumer-depl.yaml
}

while getopts "istgu" opt; do
	case $opt in
	i) build_wsprnet_ingress ;;
	s) build_spot_consumer ;;
	t) build_status_consumer ;;
	g) build_grid6_consumer ;;
	u) build_grid6_consumer ;;
	*)
		echo 'error' >&2
		exit 1
		;;
	esac
done
