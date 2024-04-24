export default async function validate(values){
    let errors = {};
    let hostname = ''
    try{
        const parsedURL = new URL(values.url);
        hostname = parsedURL.hostname;
        
        if(hostname.includes('amazon.com') 
        || hostname.includes('amazon.') 
        || hostname.endsWith('amazon')
        || hostname.includes('coles.com')
        || hostname.includes('woolworths.com')
        || hostname.includes('jbhifi.com')
        )
        {
            return errors;
        }else {
            errors.error = 'Invalid domain name'
            return errors
        }
    }
    catch (e) {
        errors.error = 'Invalid URL'
        console.log(e)
        return errors
    }



}