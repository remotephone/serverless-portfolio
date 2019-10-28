This is the effective policy I created for my lambda function to run as. This is prior to the SNS modifications of the next lesson. 

~~~
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:us-east-1:1234556789012:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:us-east-1:1234556789012:log-group:/aws/lambda/portfolio_updater:*"
            ]
        },
        {
            "Sid": "getobjectlambdaperms",
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::portfolio-build.my.portfolio.bucket/*"
        },
        {
            "Sid": "putobjectlambdaperms",
            "Effect": "Allow",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::my.portfolio.bucket/*"
        }
    ]
}
~~~