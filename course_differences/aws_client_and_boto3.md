
I have a few different accounts and profiles I use for AWS, so I needed to specify a profile for my credentials. This is how you do that. 

The code is also written in python2, this is in python3. 

~~~
import boto3
import mimetypes
from zipfile import ZipFile
from io import BytesIO


session = boto3.session.Session(profile_name='portfolio')
s3 = session.resource('s3')
portfolio_bucket = s3.Bucket('portfolio.my.bucket')

build_bucket = s3.Bucket('portfolio-build.portfolio.my.bucket')
my_zip = ZipFile(BytesIO(build_bucket.Object('portfolio-build.zip').get()['Body'].read()))
for nm in my_zip.namelist():
    obj = my_zip.open(nm)
    portfolio_bucket.upload_fileobj(obj, Key=nm, ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
~~~

I also don't like public ACLs, so my bucket had a temporary read all policy for troubleshooting, but then I revoked that and just left the cloudfront distribution policy in place.