# church-inventory

## Maven
The frontend-maven-plugin maven plugin requires Maven 3.1+ so this needs to be updated in IntelliJ as the bundled maven is 3.0 and not high enough.


Note: Want to see your JavaScript changes automatically? Move into the src/main/resource/static, and run npm run-script watch to put webpack into watch mode. It will regenerate bundle.js as you edit the source. Assuming you’ve setup your IDE properly(http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-hotswapping), spring-boot-devtools combined with this should speed up changes.

## Lombok plugin
This project uses the Lombok plugin to remove the need for getters and setters in the project etc. This requires the Lombok plugin to be added to the IDE, otherwise the code isn't generated and it won't compile.