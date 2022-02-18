from aws_cdk import (
	core as cdk,
	aws_dynamodb as dynamodb
)

class FantasyFootballStack(cdk.Stack):

	def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
		super().__init__(scope, construct_id, **kwargs)

		table = dynamodb.Table(
			self,
			f'{construct_id}-dyanamodb',
			table_name='FantasyFootball',
			partition_key='Key'
		)