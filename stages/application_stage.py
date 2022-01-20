from aws_cdk import (
    core as cdk
)

from stacks.fantasy_football_stack import FantasyFootballStack
from stacks.personal_website_stack import PersonalWebsiteStack

class ApplicationStage(cdk.Stage):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        FantasyFootballStack(self, 'ben-groseclose-fantasy-footballs', **kwargs)

        PersonalWebsiteStack(self, 'ben-groseclose-website', **kwargs)


