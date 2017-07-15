void stitch(int a[])
{
	for(int i=0;i<2;i++)
	{
		Mat img1=imread(a[i]);
		Size size(1024,780);
		resize(img1,img1,size);
		Mat gray_img1;

		//converting to grayscale

		cvtColor(img1,gray_img1,CV_RGB2GRAY);

		//1: Detect the key point usinf surf detector
		int minHessian = 400;
        SurfFeatureDetector detector( minHessian );
        vector< KeyPoint > keypoints_object, keypoints_scene;
        detector.detect( gray_img1, keypoints_object );

        //2: caculate the descriptor(featured vectors)
        SurfFeatureDetector extractor;
        Mat descriptors_object,descriptors_scene;
        extractor.compute(gray_img1,keypoints_object,descriptors_object);

        //3. Match descriptor vector using FLANN Matcher

        FlannBasedMatcher matcher;
        vector< Dmatch > mathches;
        matcher.match(descriptors_object,descriptors_scene,matches);
        double max_dist=0;
        double min_dist=100;

        //calculate min-max distance between the keypoints

        for(int i=0;i<descriptors_object.rows;i++)
        {
        	double dist=mathches[i].distance;
        	if(dist<min_dist) min_dist=dist;
        	if(dist>max_dist) max_dist=dist;
        }

        //use only good matches

        vector<Dmatch> goodmatches;
        for(int i=0;i<descriptors_object.rows;i++)
        {
        	if(mathches[i].distance< 3*min_dist)
        	{
        		goodmatches.pushback(matches[i]);
        	}
        }

        vector point2f > object;
        vector point2f > scene; 

        for(int i=0;i<good_matches.size();i++)
        {
        	// get the keypoints from god matches

                obj.push_back( keypoints_object[good_matches[i].queryIdx].pt );
                scene.push_back( keypoints_scene[good_matches[i].trainIdx].pt );
        }
        // find the homeography matrix
        Mat H=findHomography(obj,scene,CV_RANSAC);
        CV::match result;

        warpPerspective(img1,result,H,cv::size(img1.cols+img2.cols,img1.rows));
        cv::Mat half(result,cv::rect(0,0,img2.cols,img2.rows));
        img2.copyTo(half);

        /* To remove the black portion after stitching, and confine in a rectangular region*/

        // vector with all non-black point positions
        vector<cv::Point> nonBlackList;
        nonBlackList.reserve(result.rows*result.cols);

        // add all non-black points to the vector
        // there are more efficient ways to iterate through the image
        for(int j=0;j<result.rows;j++)
            for(int i=0;i<result.cols;i++)
            {
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

        waitkey(0);
        return(0);

	}
}