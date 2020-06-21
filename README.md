# health-ui

## Development
### 1. npm install
#### 1.1 npm install mockjs --save-dev

### 2. npm run serve

### 3. login
#### 3.1 http://localhost:8080/
#### 3.1 http://localhost:8080/#/login

### 4. build for deployment: npm run build


## Deployment on OpenShift platform
### 1. create app
oc new-app --name=nginx-vue -l app=nginx-vue --docker-image=docker.io/dlqiaoxy/nginx-vue

### 2. config resource usage

#### 2.1 resource for DeploymentConfig strategy
spec.strategy.resources:
 limits:
   cpu: 100m
   memory: 100Mi
 requests:
    cpu: 100m
    memory: 100Mi

#### 2.2 resource for container
oc set resources dc/nginx-vue --limits=cpu=100m,memory=100Mi --requests=cpu=100m,memory=100Mi

### 3. create route
oc create route edge --service=nginx-vue

### 4. remove app
oc delete all -l app=nginx-vue
