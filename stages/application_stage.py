from constructs import Construct
from aws_cdk import (
    Stage
)

from stacks.personal_website_stack import PersonalWebsiteStack

class ApplicationStage(Stage):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        PersonalWebsiteStack(self, 'ben-groseclose-website', **kwargs)


