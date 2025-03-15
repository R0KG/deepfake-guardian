import logging
import time
from functools import wraps

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)

logger = logging.getLogger("deepfake-guardian")

def get_logger():
    """
    Get the application logger.
    
    Returns:
        logging.Logger: The application logger.
    """
    return logger

def log_request(func):
    """
    Decorator to log API requests.
    
    Args:
        func: The function to decorate.
        
    Returns:
        function: The decorated function.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        start_time = time.time()
        logger.info(f"Request received: {func.__name__}")
        
        result = await func(*args, **kwargs)
        
        end_time = time.time()
        duration = (end_time - start_time) * 1000  # Convert to milliseconds
        logger.info(f"Request completed: {func.__name__} in {duration:.2f}ms")
        
        return result
    
    return wrapper 