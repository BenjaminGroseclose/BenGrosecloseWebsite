from aws_cdk import (
    core as cdk,
    aws_s3 as s3
)

class BenGrosecloseWebsiteStack(cdk.Stack):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # The code that defines your stack goes here

        # example resource
        # queue = sqs.Queue(
        #     self, "BenGrosecloseWebsiteQueue",
        #     visibility_timeout=cdk.Duration.seconds(300),
        # )
