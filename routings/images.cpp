void stitch(int a[])
{
  
 for(int i=0;i<a[3];i++)
 {
        Mat image1 = imread( a[i] );
        Size size(1024,780);
        resize(image1,image1,size);
        Mat gray_image1;

        //Covert to Grayscale
        cvtColor( image1, gray_image1, CV_RGB2GRAY );
        if ( !gray_image1.data)
        {
                cout << " --(!) Error reading images " <<endl;
                return -1;
        }
        
        //--Step 1 : Detect the keypoints using SURF Detector
        
        int minHessian = 400;
        SurfFeatureDetector detector( minHessian );
        vector< KeyPoint > keypoints_object, keypoints_scene;
        detector.detect( gray_image1, keypoints_object );

        //--Step 2 : Calculate Descriptors (feature vectors)
        SurfDescriptorExtractor extractor;
        Mat descriptors_object,descriptors_scene;
        extractor.compute( gray_image1, keypoints_object, descriptors_object );

        //--Step 3 : Matching descriptor vectors using FLANN matcher
        FlannBasedMatcher matcher;
        vector< DMatch > matches;
        matcher.match( descriptors_object, descriptors_scene, matches );
        double max_dist = 0;
        double min_dist = 100;

        //--Quick calculation of min-max distances between keypoints
        for(int i =0; i < descriptors_object.rows ; i++)
        {
                double dist = matches[i].distance;
                if( dist < min_dist ) min_dist = dist;
                if( dist > max_dist ) max_dist = dist;
        }

        //--Use only "good" matches (i.e. whose distance is less than 3 X min_dist )
        vector< DMatch > good_matches;

        for(int i =0 ; i < descriptors_object.rows ; i++)
        {
                if( matches[i].distance < 3*min_dist )
                {
                        good_matches.push_back( matches[i] );
                }
        }
        vector< Point2f > obj;
        vector< Point2f > scene;

        for( int i = 0; i < good_matches.size(); i++)
        {
                //--Get the keypoints from the good matches
                obj.push_back( keypoints_object[good_matches[i].queryIdx].pt );
                scene.push_back( keypoints_scene[good_matches[i].trainIdx].pt );
        }

        //Find the Homography Matrix
        Mat H = findHomography( obj, scene, CV_RANSAC );

        // Use the homography Matrix to warp the images
        cv::Mat result;

        warpPerspective( image1, result, H, cv::Size( image1.cols+image2.cols, image1.rows) );
        cv::Mat half(result, cv::Rect(0, 0, image2.cols, image2.rows) );
        image2.copyTo(half);

        /* To remove the black portion after stitching, and confine in a rectangular region*/

        // vector with all non-black point positions
        vector<cv::Point> nonBlackList;
        nonBlackList.reserve(result.rows*result.cols);

        // add all non-black points to the vector
        // there are more efficient ways to iterate through the image
        for(int j=0; j<result.rows; ++j)
                for(int i=0; i<result.cols; ++i)
                {
                        // if not black: add to the list
                        if(result.at<cv::Vec3b>(j,i) != cv::Vec3b(0,0,0))
                        {
                                nonBlackList.push_back(cv::Point(i,j));
                        }
                }

        // create bounding rect around those points
        cv::Rect bb = cv::boundingRect(nonBlackList);
        // display result and save it
        cv::imshow("Result", result(bb));
        cv::imwrite("./Result.jpg", result(bb));

        //imshow( "Result", result );
        //imwrite( "./Result.jpg", result );

        waitKey(0);

        return 0;
}
/** function readme */
void readme()
{
       cout <<" Usage: pano < img1 > < img2 > " <<endl;
}
}