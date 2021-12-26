#!/usr/bin/env python3
import os

from aws_cdk import core as cdk

from stacks.ben_groseclose_website_stack import BenGrosecloseWebsiteStack

env = cdk.Environment(account='349097218527', region='us-east-2')

app = cdk.App()
BenGrosecloseWebsiteStack(app, "BenGrosecloseWebsiteStack", env=env)

app.synth()
