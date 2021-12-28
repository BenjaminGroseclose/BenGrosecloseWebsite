from aws_cdk import (
    core as cdk,
    aws_s3 as s3,
    aws_s3_deployment as s3_deployment,
    aws_iam as iam
)

class PersonalWebsiteStack(cdk.Stack):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        bucket = s3.Bucket(
            self,
            f'{construct_id}-react-bucket',
            bucket_name='ben-groseclose-website',
            public_read_access=True,
            website_index_document='index.html',
        )

        bucket_policy = iam.PolicyStatement(
            actions=['s3:GetObject'],
            resources=[f'{bucket.bucket_arn}'],
            principals=[iam.AnyPrincipal()]
        )

        bucket.add_to_resource_policy(bucket_policy)

        s3_deployment.BucketDeployment(
            self,
            f'{construct_id}-bucket-deployment',
            destination_bucket=bucket,
            sources=[s3_deployment.Source.asset('code/ui/ben-groseclose-ui')]
        )