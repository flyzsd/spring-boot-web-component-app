# How to deploy into Pivotal Cloud Foundry
```bash
$ mvn clean package
$ cf delete spring-web -f -r
$ cf push spring-web -p target/spring-web.war -f cloudfoundry/dev-manifest.yml
```