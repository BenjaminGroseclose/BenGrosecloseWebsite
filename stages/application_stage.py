from aws_cdk import (
    core as cdk,
    aws_s3 as s3
)

from stacks.personal_website_stack import PersonalWebsiteStack

class ApplicationStage(cdk.Stage):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        PersonalWebsiteStack(self, 'ben-groseclose-website', **kwargs)


