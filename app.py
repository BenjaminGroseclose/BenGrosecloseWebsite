#!/usr/bin/env python3
import os

from aws_cdk import core as cdk

from stacks.pipeline_stack import PipelineStack

env = cdk.Environment(account='349097218527', region='us-east-2')

app = cdk.App()
#BenGrosecloseWebsiteStack(app, "BenGrosecloseWebsiteStack", env=env)

PipelineStack(app, 'deployment-pipeline', env=env)

app.synth()
