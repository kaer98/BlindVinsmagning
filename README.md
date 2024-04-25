# Blind Vinsmagning

## Repository Content

[Express.js Backend API](/Backend/) made by [@SeymenNW](https://github.com/SeymenNW)

[Flutter App 1](/appr/) made by [@kaer98](https://github.com/kaer98)

[Flutter App 2](/appj/) made by [@joakimokkels](https://github.com/joakimokkels)

[React Site 1](/ReactSK/) made by [@SeymenNW](https://github.com/SeymenNW)

[React Site 2](/ReactA/) made by [@AdilJavatogo](https://github.com/AdilJavatogo)

## Kubernetes

Clone the kubernetes manifest: [vinsmagning-kubernetes.yaml](/vinsmagning-kubernetes.yaml). Click on view raw and copy the URL which contains a token.

On the kubernetes control-plane/master node, run this command:

```console
curl https://raw.githubusercontent.com/kaer98/BlindVinsmagning/main/vinsmagning-kubernetes.yaml?token=GHSAT0AAAAAACRMDUS5ZKUUBJBEPRWJO7JWZRJATNQ -o vinsmagning.yaml
```

Replace the token/url if needed. This will download the manifest and place it in the `vinsmagning.yaml` file.

Add a secret for the registry if needed.

```console
kubectl create secret docker-registry regcred --docker-server=<your-registry-server> --docker-username=<your-name> --docker-password=<your-pword>
```

Then you can deploy it using the following command:

```console
kubectl apply -f vinsmagning.yaml
```

Check the deployment status with this command:

```console
kubecl get pods
```
