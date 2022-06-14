'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the ${chalk.red('SAP Digital Manufacturing Cloud for View and Execution POD Plugin')} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'vendor',
        message: 'What is the Vendor name for your project?',
        default: "sapdmc"
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is the Module name for your project?',
        default: "podplugins"
      },
      {
        type: 'input',
        name: 'host',
        message: 'What is your DMC host name?',
        default: "dmc-az-cons-training.test.execution.eu20.dmc.cloud.sap"
      },
      {
        type: 'input',
        name: 'namespace',
        message: 'What is the Application namespace?',
        default: "sapdmc.ext.podplugins"
      },
      {
        type: 'confirm',
        name: 'workcenter',
        message: 'Support WORK_CENTER PODS?',
        default: true
      },
      {
        type: 'confirm',
        name: 'operation',
        message: 'Support OPERATION PODS?',
        default: true
      },
      {
        type: 'confirm',
        name: 'order',
        message: 'Support ORDER PODS?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      // build path for namespace
      // vendor.ext.podplugins -> vendor/ext/podplugins
      if (props.namespace && typeof (props.namespace === "string")) {
        this.props.namespacePath = props.namespace.replace(/\./g, '/');
      } else {
        this.props.namespacePath = '';
      }
    });
  }

  writing() {
    
    this.fs.copyTpl(
      this.templatePath('xs-security.json'),
      this.destinationPath('xs-security.json'),
      {xsappname: this.props.moduleName}
    );
    

    this.fs.copyTpl(
      this.templatePath('mta.yaml'),
      this.destinationPath('mta.yaml'),
      {name: this.props.moduleName, host: this.props.host, vendor: this.props.vendor}
    );

    this.fs.copyTpl(
      this.templatePath('template/xs-app.json'),
      this.destinationPath(this.props.moduleName+'/xs-app.json'),
      {name: this.props.moduleName}
    );

    this.fs.copyTpl(
      this.templatePath('template/package.json'),
      this.destinationPath(this.props.moduleName+'/package.json'),
      {name: this.props.moduleName}
    );

   this.fs.copyTpl(
      this.templatePath('template/webapp/index.html'),
      this.destinationPath(this.props.moduleName+'/webapp/index.html'),
      {name: this.props.moduleName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/Component.js'),
      this.destinationPath(this.props.moduleName+'/webapp/Component.js'),
      {name: this.props.moduleName, namespace: this.props.namespace, namespacePath: this.props.namespacePath}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/manifest.json'),
      this.destinationPath(this.props.moduleName+'/webapp/manifest.json'),
      {namespace: this.props.namespace}
    );

    var strPodTypes = "[";
    
    if (this.props.workcenter){strPodTypes=strPodTypes+"\"WORK_CENTER\"";}
    if (this.props.workcenter && this.props.operation){strPodTypes=strPodTypes+",";}
    
    if (this.props.operation){strPodTypes=strPodTypes+"\"OPERATION\"";}
    if (this.props.operation && this.props.order){strPodTypes=strPodTypes+",";}

    if (this.props.order){strPodTypes=strPodTypes+"\"ORDER\"";}

    var strPodTypes= strPodTypes+"]";


    this.fs.copyTpl(
      this.templatePath('template/webapp/template/designer/components.json'),
      this.destinationPath(this.props.moduleName+'/webapp/designer/components.json'),
      {name: this.props.moduleName, namespace: this.props.namespace, podTypes: strPodTypes, vendor: this.props.vendor}
    );


    this.fs.copyTpl(
      this.templatePath('template/webapp/template/asynchExecutionPluginTemplate/manifest.json'),
      this.destinationPath(this.props.moduleName+'/webapp/asynchExecutionPluginTemplate/manifest.json'),
      {name: this.props.moduleName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/asynchExecutionPluginTemplate/Component.js'),
      this.destinationPath(this.props.moduleName+'/webapp/asynchExecutionPluginTemplate/Component.js'),
      {name: this.props.moduleName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/asynchExecutionPluginTemplate/builder/PropertyEditor.js'),
      this.destinationPath(this.props.moduleName+'/webapp/asynchExecutionPluginTemplate/builder/PropertyEditor.js'),
      {name: this.props.moduleName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/asynchExecutionPluginTemplate/i18n/builder.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/asynchExecutionPluginTemplate/i18n/builder.properties'),
      {vendor: this.props.vendor}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/asynchExecutionPluginTemplate/i18n/i18n.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/asynchExecutionPluginTemplate/i18n/i18n.properties'),
      {vendor: this.props.vendor}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/asynchExecutionPluginTemplate/i18n/i18n_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/asynchExecutionPluginTemplate/i18n/i18n_en.properties'),
      {vendor: this.props.vendor}
    );
    this.fs.copyTpl(
      this.templatePath('template/webapp/template/asynchExecutionPluginTemplate/i18n/builder_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/asynchExecutionPluginTemplate/i18n/builder_en.properties'),
      {vendor: this.props.vendor}
    );
    this.fs.copyTpl(
      this.templatePath('template/webapp/template/asynchExecutionPluginTemplate/i18n/i18n_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/asynchExecutionPluginTemplate/i18n/i18n_en_US.properties'),
      {vendor: this.props.vendor}
    );
    this.fs.copyTpl(
      this.templatePath('template/webapp/template/asynchExecutionPluginTemplate/i18n/builder_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/asynchExecutionPluginTemplate/i18n/builder_en_US.properties'),
      {vendor: this.props.vendor}
    );


   this.fs.copyTpl(
      this.templatePath('template/webapp/template/executionPluginTemplate/builder/PropertyEditor.js'),
      this.destinationPath(this.props.moduleName+'/webapp/executionPluginTemplate/builder/PropertyEditor.js'),
      {name: this.props.moduleName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/executionPluginTemplate/i18n/builder.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/executionPluginTemplate/i18n/builder.properties'),
      {vendor: this.props.vendor}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/executionPluginTemplate/i18n/i18n.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/executionPluginTemplate/i18n/i18n.properties'),
      {vendor: this.props.vendor}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/executionPluginTemplate/i18n/i18n_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/executionPluginTemplate/i18n/i18n_en.properties'),
      {vendor: this.props.vendor}
    );
    this.fs.copyTpl(
      this.templatePath('template/webapp/template/executionPluginTemplate/i18n/builder_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/executionPluginTemplate/i18n/builder_en.properties'),
      {vendor: this.props.vendor}
    );
    this.fs.copyTpl(
      this.templatePath('template/webapp/template/executionPluginTemplate/i18n/i18n_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/executionPluginTemplate/i18n/i18n_en_US.properties'),
      {vendor: this.props.vendor}
    );
    this.fs.copyTpl(
      this.templatePath('template/webapp/template/executionPluginTemplate/i18n/builder_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/executionPluginTemplate/i18n/builder_en_US.properties'),
      {vendor: this.props.vendor}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/viewPluginTemplate/builder/PropertyEditor.js'),
      this.destinationPath(this.props.moduleName+'/webapp/viewPluginTemplate/builder/PropertyEditor.js'),
      {name: this.props.moduleName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/viewPluginTemplate/i18n/builder.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/viewPluginTemplate/i18n/builder.properties'),
      {vendor: this.props.vendor}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/viewPluginTemplate/i18n/i18n.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/viewPluginTemplate/i18n/i18n.properties'),
      {vendor: this.props.vendor}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/viewPluginTemplate/i18n/i18n_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/viewPluginTemplate/i18n/i18n_en.properties'),
      {vendor: this.props.vendor}
    );
    this.fs.copyTpl(
      this.templatePath('template/webapp/template/viewPluginTemplate/i18n/builder_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/viewPluginTemplate/i18n/builder_en.properties'),
      {vendor: this.props.vendor}
    );
    this.fs.copyTpl(
      this.templatePath('template/webapp/template/viewPluginTemplate/i18n/i18n_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/viewPluginTemplate/i18n/i18n_en_US.properties'),
      {vendor: this.props.vendor}
    );
    this.fs.copyTpl(
      this.templatePath('template/webapp/template/viewPluginTemplate/i18n/builder_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/viewPluginTemplate/i18n/builder_en_US.properties'),
      {vendor: this.props.vendor}
    );


    this.fs.copyTpl(
      this.templatePath('template/webapp/template/view/MainView.view.xml'),
      this.destinationPath(this.props.moduleName+'/webapp/view/MainView.view.xml'),
      {name: this.props.moduleName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/model/models.js'),
      this.destinationPath(this.props.moduleName+'/webapp/model/models.js')
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/i18n/i18n.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/i18n/i18n.properties'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/i18n/i18n_en.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/i18n/i18n_en.properties'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/i18n/i18n_en_US.properties'),
      this.destinationPath(this.props.moduleName+'/webapp/i18n/i18n_en_US.properties'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/css/style.css'),
      this.destinationPath(this.props.moduleName+'/webapp/css/style.css')
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/controller/MainView.controller.js'),
      this.destinationPath(this.props.moduleName+'/webapp/controller/MainView.controller.js'),
      {name: this.props.moduleName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/viewPluginTemplate/view/PluginView.view.xml'),
      this.destinationPath(this.props.moduleName+'/webapp/viewPluginTemplate/view/PluginView.view.xml'),
      {name: this.props.moduleName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/model/models.js'),
      this.destinationPath(this.props.moduleName+'/webapp/model/models.js')
    );

   this.fs.copyTpl(
      this.templatePath('template/webapp/template/viewPluginTemplate/controller/PluginView.controller.js'),
      this.destinationPath(this.props.moduleName+'/webapp/viewPluginTemplate/controller/PluginView.controller.js'),
      {name: this.props.moduleName, namespace: this.props.namespace}
    );
   
   this.fs.copyTpl(
      this.templatePath('template/webapp/template/viewPluginTemplate/css/style.css'),
      this.destinationPath(this.props.moduleName+'/webapp/viewPluginTemplate/css/style.css')
    );

 
  }

  install() {
    this.npmInstall();

    }

  end() {
    this.log(
      yosay(
        `All finshed! Ready for you to add some cool functionality`
      ));
  }
};
