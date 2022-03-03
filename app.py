#!/usr/bin/env python3
from aws_cdk import App, Environment

from stacks.pipeline_stack import PipelineStack

env = Environment(account='349097218527', region='us-east-1')

app = App()

PipelineStack(app, 'deployment-pipeline', env=env)

app.synth()
