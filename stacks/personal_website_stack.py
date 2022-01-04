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

        hosted_zone = route53.PublicHostedZone(
            self,
            f'{construct_id}-hosted-zone',
            zone_name=domain_name,
            comment=f'{domain_name} hosted zone'
        )

        cert = acm.Certificate(
            self,
            f'{construct_id}-cert',
            validation=acm.CertificateValidation.from_dns(hosted_zone=hosted_zone),
            subject_alternative_names=[
                f'www.{domain_name}'
            ],
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
        
        cloud_front_oai = cloudfront.OriginAccessIdentity(self, f'{construct_id}-oai')

        distribution = cloudfront.CloudFrontWebDistribution(
            self,
            f'{construct_id}-cloudfront',
            origin_configs=[
                cloudfront.SourceConfiguration(
                    s3_origin_source=cloudfront.S3OriginConfig(
                        s3_bucket_source=bucket,
                        origin_access_identity=cloud_front_oai
                    ),
                    behaviors=[cloudfront.Behavior(is_default_behavior=True)]
                )
            ],
            viewer_certificate=cloudfront.ViewerCertificate.from_acm_certificate(
                certificate=cert,
                aliases=[f'www.{domain_name}', domain_name],
                ssl_method=cloudfront.SSLMethod.SNI
            )
        )

        route53.ARecord(
            self,
            f'{construct_id}-arecord',
            zone=hosted_zone,
            target=route53.RecordTarget.from_alias(targets.CloudFrontTarget(distribution))
        )

        bucket.grant_read(cloud_front_oai.grant_principal)
