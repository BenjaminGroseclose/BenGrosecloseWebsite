from aws_cdk import (
  core as cdk,
  pipelines
)

from stages.application_stage import ApplicationStage

class PipelineStack(cdk.Stack):
    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs)-> None:
        super().__init__(scope, construct_id, **kwargs)

        synthStep = pipelines.ShellStep(
            'Synth',
            install_commands=['npm install -g aws-cdk@1.137.0', 
                              'python -m pip install -r requirements.txt'],
            commands=['cdk synth'],
            input=pipelines.CodePipelineSource.connection(
                repo_string="BenjaminGroseclose/BenGrosecloseWebsite",
                branch='main',
                connection_arn='arn:aws:codestar-connections:us-east-2:349097218527:connection/28f47611-9c10-4300-9f47-9d3f7299433d',
                trigger_on_push=True
            )
        )

        pipeline = pipelines.CodePipeline(self,
                                          construct_id,
                                          self_mutation=True,
                                          pipeline_name='DeploymentPipeline',
                                          synth=synthStep)

        pipeline.add_stage(ApplicationStage(
            self,
            'ApplicationStage',
            **kwargs
        ))
