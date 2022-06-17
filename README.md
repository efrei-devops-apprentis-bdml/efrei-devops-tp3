### Rapport · Devops TP3

### Fonctionnement général

Le but du TP est de créer un worflow github action qui, à chaque push sur le répo, build l'image Docker du projet et la push sur un container dans Azure.
 ```mermaid
graph flow;
    Repo Github-->Build;
    Build-->Azure Containe Instance;
```

### Configuration du Dockerfile

Pour répondre au besoin d'automatiser le push de l'image dans l'ACR, nous avons rajouté les instructions suivantes. 
Le projet étant créé en sein de l'organisation efrei-devops-apprentis-bdml, l'accés au credentials d'Azure est fait grâce au secrets de l'organisation.

```
- name: 'Login via Azure CLI'
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
          
      - name: 'Build and push image'
        uses: azure/docker-login@v1
        with:
          login-server: ${{ secrets.REGISTRY_LOGIN_SERVER }}
          username: ${{ secrets.REGISTRY_USERNAME }}
          password: ${{ secrets.REGISTRY_PASSWORD }}

      - name: 'Deploy to Azure Container Instances'
        uses: 'azure/aci-deploy@v1'
        with:
          resource-group: ${{ secrets.RESOURCE_GROUP }}
          dns-name-label: devops-2018067666
          image: ${{ secrets.REGISTRY_LOGIN_SERVER }}/20180676:v1
          registry-login-server: ${{ secrets.REGISTRY_LOGIN_SERVER }}
          registry-username: ${{ secrets.REGISTRY_USERNAME }}
          registry-password: ${{ secrets.REGISTRY_PASSWORD }}
          environment-variables: API_KEY=${{ secrets.API_KEY }}
          name: 20180676
          location: 'france central'
 ```
 
Un seul problème rencontré à cette étape, le fait qu'un autre dns dans la même région avait déjà le label devops-20180676, je l'ai donc remplacé par devops-2018067666. Ainsi, le container est bien créé et l'image est bien déployé dedans ! 
 
 
 ### Test de l'API 
 
 Une fois déployé, nous testons le bon fonctionnement de l'API déployé. Après quelques tests, nous observons que cela ne fonctionne pas car l'API nodejs écoute sur le port 8080 alors qu'Azure ne permet l'écoute que sur le port 80. Après avoir modifié, cela fonctionne like a charm.
 
 Url pout tester : http://devops-2018067666.francecentral.azurecontainer.io/weather?lat=2.349014&long=48.864716
 
 
