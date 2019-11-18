This is the final lambda I ended up with. I had to handle a few different problems not addressed in the course material.

- Everything is python3 compatible
- If you have anything wihtout a file extension, like a .gitignore for example, guessing the mimetype won't work. I added a default value for that.
- The code in the example assumed the build never failed. This resulted in CodePipelines with never ending Lambda Tasks. I created a error notification for those. 

~~~
import json
import boto3
import mimetypes
from zipfile import ZipFile
from io import BytesIO


def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-east-1:<aws acct #>:portfolio-build')
    codepipeline = boto3.client('codepipeline')

    location = {"bucketName": "portfolio-build.<mybucket>",
               "objectKey": "portfolio-build.zip"}

    # This is a codepipeline job object - see https://docs.aws.amazon.com/codepipeline/latest/APIReference/API_GetJobDetails.html
    job = event.get('CodePipeline.job')
    if job:
        for artifact in job['data']['inputArtifacts']:
            if artifact ['name'] == "SourceArtifact":
                location = artifact['location']['s3Location']
                

    print('Building portfolio from {}'.format(str(location)))
    
    try:
        session = boto3.session.Session()
        s3 = session.resource('s3')
        portfolio_bucket = s3.Bucket('<mybucket>')
        build_bucket = s3.Bucket(location['bucketName'])
        my_zip = ZipFile(BytesIO(build_bucket.Object(location['objectKey']).get()['Body'].read()))
        for nm in my_zip.namelist():
            obj = my_zip.open(nm)
            print('uploading {}'.format(nm))
            mime = mimetypes.guess_type(nm)[0]
            if mime == None:
                mime = "text/plain"
            portfolio_bucket.upload_fileobj(obj, Key=nm, ExtraArgs={'ContentType': mime})
        if job:
            codepipeline.put_job_success_result(jobId=job['id'])
        topic.publish(Message='Oh yes! It worked')
    except:
        print('error!')
        if job:
            codepipeline.put_job_failure_result(jobId=job['id'],  failureDetails={
        'type': 'JobFailed',
        'message': 'OOPS'})
        topic.publish(Message='Oh noes!')

~~~


This stopped working after I made some tweaks. Using the SourceArtifacts was resulting in everything ending up in the bucket instead of just the output. I changed the lambda function to this:

~~~
import json
import boto3
import mimetypes
from zipfile import ZipFile
from io import BytesIO


def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-east-1:ACCTID:portfolio-build')
    codepipeline = boto3.client('codepipeline')

    location = {"bucketName": "BUILDBUCKETNAME",
               "objectKey": "portfolio-build.zip"}

    # # This is a codepipeline job object - see https://docs.aws.amazon.com/codepipeline/latest/APIReference/API_GetJobDetails.html
    job = event.get('CodePipeline.job')
    print(job)


    print('Building portfolio from {}'.format(str(location)))
    
    try:
        session = boto3.session.Session()
        s3 = session.resource('s3')
        portfolio_bucket = s3.Bucket('BUCKETNAME')
        build_bucket = s3.Bucket(location['bucketName'])
        my_zip = ZipFile(BytesIO(build_bucket.Object(location['objectKey']).get()['Body'].read()))
        for nm in my_zip.namelist():
            obj = my_zip.open(nm)
            print('uploading {}'.format(nm))
            mime = mimetypes.guess_type(nm)[0]
            if mime == None:
                mime = "text/plain"
            portfolio_bucket.upload_fileobj(obj, Key=nm, ExtraArgs={'ContentType': mime})
        topic.publish(Message='Oh yes! It worked')
    except:
        print('error!')
        if job:
            codepipeline.put_job_failure_result(jobId=job['id'],  failureDetails={
        'type': 'JobFailed',
        'message': 'OOPS'})
        topic.publish(Message='Oh noes!')

~~~

