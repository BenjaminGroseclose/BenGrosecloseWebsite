from constructs import Construct
from aws_cdk import (
  Stack,
  pipelines
)

from stages.application_stage import ApplicationStage

class PipelineStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs)-> None:
        super().__init__(scope, construct_id, **kwargs)

        synthStep = pipelines.ShellStep(
            'Synth',
            install_commands=[
                'npm install -g aws-cdk@1.144.0', 
                'python -m pip install -r requirements.txt'
            ],
            commands=[
                "cd code/ui/ben-groseclose-ui && npm install",
                "npm run build",
                "cd ../../../ && cdk synth"
            ],
            input=pipelines.CodePipelineSource.connection(
                repo_string="BenjaminGroseclose/BenGrosecloseWebsite",
                branch='main',
                connection_arn='arn:aws:codestar-connections:us-east-1:349097218527:connection/3452d62d-edc4-4688-b5de-9c91d41249b1',
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
