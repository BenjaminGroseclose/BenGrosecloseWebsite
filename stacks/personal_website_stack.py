from aws_cdk import (
    core as cdk,
    aws_s3 as s3,
    aws_s3_deployment as s3_deployment,
    aws_cloudfront as cloudfront,
    aws_route53 as route53,
    aws_route53_targets as targets,
    aws_certificatemanager as acm
)

class PersonalWebsiteStack(cdk.Stack):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        domain_name = 'bengroseclose.com'

        hosted_zone = route53.HostedZone(
            self,
            f'{construct_id}-hosted-zone',
            zone_name=domain_name,
            comment=f'{domain_name} hosted zone'
        )

        cert = acm.DnsValidatedCertificate(
            self,
            f'{construct_id}-cert',
            hosted_zone=hosted_zone,
            validation=acm.CertificateValidation.from_dns(hosted_zone=hosted_zone),
            region='us-east-2',
            domain_name=domain_name
        )

        bucket = s3.Bucket(
            self,
            f'{construct_id}-react-bucket',
            bucket_name=domain_name,
            public_read_access=True,
            removal_policy=cdk.RemovalPolicy.DESTROY,
            website_index_document='index.html'
        )

        s3_deployment.BucketDeployment(
            self,
            f'{construct_id}-bucket-deployment',
            destination_bucket=bucket,
            sources=[s3_deployment.Source.asset('code/ui/ben-groseclose-ui/build')]
        )

        distribution = cloudfront.CloudFrontWebDistribution(
            self,
            f'{construct_id}-cloudfront',
            origin_configs=[
                cloudfront.SourceConfiguration(
                    s3_origin_source=cloudfront.S3OriginConfig(
                        s3_bucket_source=bucket
                    ),
                    behaviors=[cloudfront.Behavior(is_default_behavior=True)]
                )
            ]
        )

        route53.ARecord(
            self,
            f'{construct_id}-arecord',
            zone=hosted_zone,
            record_name=domain_name,
            target=route53.RecordTarget.from_alias(targets.CloudFrontTarget(distribution))
        )
